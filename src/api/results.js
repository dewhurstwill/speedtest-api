const express = require('express');
const monk = require('monk');

const { speedtestResultSchema } = require('./schema');

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is required');
}

const db = monk(process.env.MONGODB_URI);
const speedtestResults = db.get(process.env.MONGODB_COLLECTION || 'speedtest_results');

const router = express.Router();

// READ ALL
router.get('/', async (req, res, next) => {
  try {
    let { preset, offset = 0, limit = 90 } = req.query;
    const presets = ['calendar-month', 'month', '3-weeks', 'week', 'day'];
    if (presets.includes(preset)) {
      switch (preset) {
        case 'calendar-month':
          offset = 0;
          limit = new Date().getDate();
          break;
        case 'month':
          offset = 0;
          limit = 30;
          break;
        case '3-weeks':
          offset = 0;
          limit = 21;
          break;
        case 'week':
          offset = 0;
          limit = 7;
          break;
        case 'day':
          offset = 0;
          limit = 1;
          break;
        default:
          break;
      }
    }
    const items = await speedtestResults.find({}, {
      limit: parseInt(limit, 10),
      skip: parseInt(offset, 10),
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// READ ONE
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await speedtestResults.findOne({
      _id: id
    });
    res.json(item);
  } catch (error) {
    next(error);
  }
});

// CREATE ONE
router.post('/', async (req, res, next) => {
  try {
    const value = await speedtestResultSchema.validateAsync(req.body);
    const inserted = await speedtestResults.insert(value);
    res.json(inserted);
  } catch (error) {
    next(error);
  }
});

// UPDATE ONE
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const value = await speedtestResultSchema.validateAsync(req.body);
    const item = await speedtestResults.findOne({
      _id: id,
    });
    if (!item) throw new Error('Item not found');
    const inserted = await speedtestResults.update({
      _id: id
    }, value);
    res.json(inserted);
  } catch (error) {
    next(error);
  }
});

// DELETE ONE
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await speedtestResults.remove({
      _id: id
    });
    res.json({
      message: 'Success'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
