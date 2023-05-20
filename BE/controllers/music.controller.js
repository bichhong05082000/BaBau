const musicModel = require('../models/music.model');
const ErrorResponse = require('../helpers/ErrorResponse');
const firebase = require('../configs/firebase');

const getAllMusic = async (req, res) => {
  try {
    const {
      size = 20,
      page = 1,
      search: key,
      start: startDate,
      end: endDate,
    } = req.query;
    const threeMonth = req.query.three_month;
    let bdQuery = {};

    if (key && key !== '""') {
      bdQuery.name = { $regex: new RegExp('.*' + key + '.*', 'i') };
    }

    if (startDate || endDate) {
      bdQuery.createdAt = {};
      if (startDate) bdQuery.createdAt.$gte = new Date(startDate);
      if (endDate) bdQuery.createdAt.$lte = new Date(endDate);
    }

    if (threeMonth) {
      bdQuery.threeMonth = threeMonth;
    }

    const musices = await musicModel
      .find(bdQuery)
      .skip(size * page - size)
      .limit(size)
      .exec();

    let count = await musicModel.countDocuments(bdQuery);

    let bd = {
      current_page: page,
      total_page: Math.ceil(count / size),
      count: count,
      musices: musices,
    };

    return res.status(200).json(bd);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const createMusic = async (req, res) => {
  try {
    if (!req.files || req.files.length < 2) {
      return res.status(400).send('No files uploaded.');
    }

    const body = { name: req.body?.name, threeMonth: req.body?.threeMonth };

    const imageFile = req.files.find((file) => file.mimetype.includes('image'));

    if (imageFile) {
      const imageRef = firebase.bucket.file(imageFile.originalname);
      const imageStream = imageRef.createWriteStream({
        metadata: {
          contentType: imageFile.mimetype,
        },
      });

      imageStream.on('error', (err) => {
        return res.status(400).send('Upload failed.');
      });

      imageStream.on('finish', async () => {
        await imageRef.makePublic();
        const imageUrl = `https://storage.googleapis.com/${firebase.bucket.name}/${imageRef.name}`;
        body.image = imageUrl;

        const audioFile = req.files.find((file) =>
          file.mimetype.includes('audio'),
        );
        const audioRef = firebase.bucket.file(audioFile.originalname);
        const audioStream = audioRef.createWriteStream({
          metadata: {
            contentType: audioFile.mimetype,
          },
        });

        audioStream.on('error', (err) => {
          return res.status(400).send('Upload failed.');
        });

        audioStream.on('finish', async () => {
          await audioRef.makePublic();
          const audioUrl = `https://storage.googleapis.com/${firebase.bucket.name}/${audioRef.name}`;
          body.audio = audioUrl;

          const music = await musicModel.create(body);

          return res.status(200).json(music);
        });

        audioStream.end(audioFile.buffer);
      });

      imageStream.end(imageFile.buffer);
    }
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const deleteMusic = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await musicModel.findByIdAndDelete(id);

    return res.status(200).json(result);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const music = await musicModel.findById(id);

    return res.status(200).json(music);
  } catch (error) {
    throw new ErrorResponse(500, error.message);
  }
};

module.exports = {
  getAllMusic,
  createMusic,
  deleteMusic,
  findById,
};
