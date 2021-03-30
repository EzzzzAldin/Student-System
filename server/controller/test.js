exports.addSubjects = async (req, res) => {
    try {
        // Validate Data
        const val = await validation.validateAddSubjects(req.body);
        // Get Student Data
        const student = await Student.findOne({email: req.body.email});
        // Check If Student Not Found In DB
        if(!student) return res.status(400).send('Email Is Not Exist');
        // If Student Exist Check Level Is Exist
        const level = await Level.findOne({level: req.body.level, student: student._id});
        if(!level) return res.status(401).send('Level Is Not Found');
        const subjects = await new Subjects({
            subject: req.body,
            student: student._id,
            level: level._id
        });
        await subjects.save();
        console.log(subjects);
        return;
        // Chech If Subjects Exist In DB 
        if( level.subjects.length > 0) return res.send('Subjects Already Exist');
        // If Email And Level Found In DB And Subject Not Exsit
        const { firstSubject,
                secondSubject,  
                thirdSubject, 
                fourthSubject, 
                fifthSubject, 
                sixthSubject
            } = req.body;
        const subjects = await new Subjects({
            firstSubject: firstSubject,
            secondSubject: secondSubject,
            thirdSubject: thirdSubject,
            fourthSubject: fourthSubject,
            fifthSubject: fifthSubject,
            sixthSubject: sixthSubject,
            student: student._id,
            level: level._id
        });
        await subjects.save();
        // Push Subjects is student And level
        student.subjects.push(firstSubject, secondSubject, thirdSubject, fourthSubject, fifthSubject, sixthSubject);
        await student.save();
        level.subjects.push(firstSubject, secondSubject, thirdSubject, fourthSubject, fifthSubject, sixthSubject);
        await level.save();
        res.send(subjects);
    } catch (error) {
        res.status(400).send(error.details[0].message);
    }
};




/*
exports.addSubjects = async (req, res) => {
    try {
        // Validate Data
        // const val = await validation.validateAddSubjects(req.body);
        // Get Student Data
        const student = await Student.findOne({email: req.body.email});
        // Check If Student Not Found In DB
        if(!student) return res.status(400).send('Email Is Not Exist');
        // If Student Exist Check Level Is Exist
        const level = await Level.findOne({level: req.body.level, student: student._id});
        if(!level) return res.status(401).send('Level Is Not Found');
        try {
            const subject = req.body.subject;
            const subjects = await new Subjects({
                subject: subject,
                student: student._id,
                level: level._id
            });
            await subjects.save();
            student.subjects.push(subject.toString());
            await student.save();
            level.subjects.push(subject.toString());
            await level.save();
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        res.status(400).send(error.details[0].message);
    }
};

*/



/*
exports.addDegrees = async (req, res) => {
    try {
        // Validate Data
        const val = await validation.validateAddDegrees(req.body);
        // Get Student Data
        const student = await Student.findOne({email: req.body.email});
        // Check If Student Not Found In DB
        if(!student) return res.status(400).send('Email Is Not Exist');
        // If Student Exist Check Level Is Exist
        const level = await Level.findOne({level: req.body.level, student: student._id});
        if(!level) return res.status(401).send('Level Is Not Found');
        // If Email And Level Found In DB Get Subject Of Student
        const subjects = await Subjects.findOne({level: level._id, student: student._id});
        // Get Data Degrees 
        const { firstDegree,
                secondDegree,  
                thirdDegree, 
                fourthDegree, 
                fifthDegree, 
                sixthDegree
            } = req.body;
        // Add Degrees In Subjects Model
        const degreesSubjects = await Subjects.updateOne({_id: subjects._id}, {
            firstDegree,
            secondDegree,
            thirdDegree,
            fourthDegree,
            fifthDegree,
            sixthDegree
        });
        // Add All Degeers Subjects in Level Model
        const degeersSubjects = firstDegree + secondDegree + thirdDegree + fourthDegree + fifthDegree + sixthDegree;
        await Level.updateOne({_id: level._id}, { degrees: degeersSubjects });
        // Calculate All Degrees And Add In Student
        // Get All Degrees From All Level In Array
        const degreesLevel = await Level.find({ student: student._id });
        // Set Variable Get Calculate All Degrees
        let degrees = 0;
        // Calculate All Degrees From Array
        for( let i = 0; i < degreesLevel.length; i++) {
            degrees += degreesLevel[i].degrees;
        };
        // Calculate Degrees percent
        const alldegrees = (( degrees / 3000) * 100).toFixed(2) ;
        // Update New Degrees
        await Student.updateOne({_id: student._id}, { degrees: alldegrees});
        res.send(student);
    } catch (error) {
        res.status(400).send(error.details[0].message);
    }
};
*/





exports.addSubjects = async (req, res) => {
    try {
        // Validate Data
        const val = await validation.validateAddSubjects(req.body);
        // Get Student Data
        const student = await Student.findOne({email: req.body.email});
        // Check If Student Not Found In DB
        if(!student) return res.status(400).send('Email Is Not Exist');
        // If Student Exist Check Level Is Exist
        const level = await Level.findOne({level: req.body.level, student: student._id});
        if(!level) return res.status(401).send('Level Is Not Found');
        // Get All Subjects
        const subjects = req.body.subjects;
        // Create New Subjects
        const newsubjects = await new Subjects({
            subject: subjects,
            student: student._id,
            level: level._id
        });
        await newsubjects.save();
        // Convert Keys Object Subjects To Array
        const allSubjects = Object.keys(subjects);
        // Convert Array Subjects To String To Push In Student And Level Model 
        student.subjects.push(allSubjects.toString());
        await student.save();
        level.subjects.push(allSubjects.toString());
        await level.save();
        res.send(allSubjects);
    } catch (error) {
        res.status(400).send(error.details[0].message);
    }
};

exports.addDegrees = async (req, res) => {
    try {
        // Validate Data
        const val = await validation.validateAddDegrees(req.body);
        // Get Student Data
        const student = await Student.findOne({email: req.body.email});
        // Check If Student Not Found In DB
        if(!student) return res.status(400).send('Email Is Not Exist');
        // If Student Exist Check Level Is Exist
        const level = await Level.findOne({level: req.body.level, student: student._id});
        if(!level) return res.status(401).send('Level Is Not Found');
        // If Email And Level Found In DB Get Subject Of Student
        const subjects = await Subjects.findOne({level: level._id, student: student._id});
        // Get Data Degrees 
        const newSubjectsDegrees = req.body.subjects;
        // Add Degrees In Subjects Model
        const degreesSubjects = await Subjects.updateOne({_id: subjects._id}, {
            subject: newSubjectsDegrees
        });
        // Add All Degeers Subjects in Level Model
        // Get Degrees From Object Subjects
        const arrDegrees = Object.values(newSubjectsDegrees);
        // Set New variable To Calculate All Degrees Subjects From Array Degrees
        let degeersSubjects = 0;
        arrDegrees.forEach(deg => degeersSubjects += deg);
        await Level.updateOne({_id: level._id}, { degrees: degeersSubjects });


        // Calculate All Degrees And Add In Student
        // Get All Degrees From All Level In Array
        const degreesLevel = await Level.find({ student: student._id });
        // Set Variable Get Calculate All Degrees
        let alldegreesLevel = 0;
        // Calculate All Degrees From Array
        degreesLevel.forEach(deg => alldegreesLevel += deg.degrees);
        // Get All Number Of Subject And Level To Calculate Degrees Percent
        const subLevel = await Subjects.find({student: student._id});
        const allLevelStudent = await Level.find({student: student._id});
        // Calculate Degrees percent
        const alldegrees =(( alldegreesLevel / ( (Object.keys(subLevel[0].subject).length * 100 ) * allLevelStudent.length)) * 100).toFixed(2);
        // Update New Degrees
        await Student.updateOne({_id: student._id}, { degrees: alldegrees});
        res.send(student);
    } catch (error) {
        res.status(400).send(error.details[0].message);
    }
};













