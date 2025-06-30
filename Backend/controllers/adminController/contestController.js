const express = require('express');
const Contest = require('../../models/contest');
const { useParams } = require('react-router-dom');

const createContest = async (req, res) => {
    try {
        const { contestName, organisation, startDate, duration } = req.body;

        const newContest = new Contest({
            contestName,
            startDate,
            duration,
            organisation: organisation || ''
        });

        await newContest.save();
        res.status(201).json({ success: true, contest: newContest });
    } catch (err) {
        console.error("Create Contest Error:", err);
        res.status(500).json({ success: false, error: err });
    }
};
const getAllContest = async (req, res) => {
    try {
        const allContest = await Contest.find();
        res.status(201).json({ success: true, contests: allContest })
    } catch (error) {
        console.error("Create Contest Error:", err);
        res.status(500).json({ success: false, error: err });

    }
}
const addChallenges = async (req, res) => {
    try {
        const { contestName, challenge } = req.body;
        const contest = await Contest.findOne({ contestName });
        if (!contest) {
            return res.status(404).json({ error: "Contest not found" });
        }
        contest.problems.push(challenge);
        await (contest.save());
        console.log("Updated Contest:", contest);
        res.status(200).json({ message: "Challenge added successfully", contest });
    } catch (error) {
        console.error("Error adding challenge:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
const getChallenge = async (req, res) => {
    try {
        const { id } = req.params;
        const contest = await Contest.findById(id);
        if (!contest) {
            return res.status(404).json({ message: "Contest not found" });
        }
        res.status(200).json(contest);
    } catch (error) {
        console.error("Error fetching challenge:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
const makeAnnouncements = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        if (!text || text.trim() === "") {
            return res.status(400).json({ success: false, error: "Announcement text is required." });
        }

        const contest = await Contest.findById(id);
        if (!contest) {
            return res.status(404).json({ success: false, error: "Contest not found." });
        }

        contest.announcements.unshift({
            text: text.trim(),
            announcedAt: new Date()
        });

        await contest.save();

        res.status(200).json({ success: true, message: "Announcement saved successfully." });
    } catch (error) {
        console.error("Error in makeAnnouncements:", error);
        res.status(500).json({ success: false, error: "Server error while saving announcement." });
    }
};



module.exports = { createContest, getAllContest, addChallenges, getChallenge, makeAnnouncements };