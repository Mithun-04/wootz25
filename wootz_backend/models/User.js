const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Counter = require("./Counter.js"); // Ensure correct path

const UserSchema = new mongoose.Schema({
    wootz_id: {
        type: String,
        unique: true,
        sparse: true,
        default: undefined

    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    verified: {
        type: Boolean,
        default: false
    },

    verification_token: {
        type: String,
        default: undefined
    },
    payment: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


UserSchema.pre("save", async function (next) {
    if (!this.wootz_id && this.verified) {
        try {
            const counter = await Counter.findOneAndUpdate(
                { name: "wootz_id" },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
            this.wootz_id = `WZ${String(counter.seq).padStart(4, '0')}`;
        } catch (error) {
            return next(error);
        }
    }

    next();
});

// ✅ Add this function to compare passwords
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
