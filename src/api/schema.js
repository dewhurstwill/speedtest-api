const Joi = require('joi');

const speedtestResultSchema = Joi.object({
  server: Joi.object({
    org: Joi.string().trim().required().max(64),
    location: Joi.string().trim().required().max(64),
    id: Joi.string().trim().required().max(10)
  }),
  isp: Joi.string().trim().required().max(64),
  latency: Joi.string().trim().max(8),
  download: Joi.string().trim().required().max(16),
  upload: Joi.string().trim().required().max(16),
  packetLoss: Joi.string().trim().max(32),
  resultUrl: Joi.string().trim().uri().required()
    .max(256)
});

module.exports = {
  speedtestResultSchema
};
