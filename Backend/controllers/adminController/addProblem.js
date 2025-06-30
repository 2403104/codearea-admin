const Problem=require('../../models/problems');
const addProblem = async (req, res) => {
    try {
        const {
            QNo,
            title,
            description,
            difficulty,
            timeLimit,
            memoryLimit,
            inputFormat,
            outputFormat,
            constraints,
            topics,
            checkerCode,
            sampleTestCases,
            testcases
        } = req.body;
        const problem = new Problem({
            QNo,
            title,
            description,
            difficulty,
            timeLimit,
            memoryLimit,
            inputFormat,
            outputFormat,
            constraints,
            topics,
            checkerCode,
            sampleTestCases,
            testcases            
        });
        console.log(problem);
        await problem.save();
        res.status(201).json(problem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports={addProblem}