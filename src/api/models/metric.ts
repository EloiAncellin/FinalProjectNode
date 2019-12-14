const mongoose = require('mongoose');

const metricSchema = new mongoose.Schema({
    userId: {
        type: String,
        trim: true,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    value: {
        type: Number,
        trim: true,
        required: true,
    },
    date: {
        type: Date,
        trim: true,
        required: true,
    }
});

const Metric = mongoose.model('Metric', metricSchema);
export = Metric;
