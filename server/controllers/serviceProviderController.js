import express from 'express';
import ServiceProvider from '../models/ServiceProvider.js';
import { uploadImages } from '../utils/cloudinaryConfig.js';


export const serviceProvider = async (req, res) => {
  console.log('Request received:', req.body);

  try {
    // Validate presence of document pictures
    if (!req.files || req.files.length === 0) {
      const error = new Error('Document pictures are required');
      error.status = 400;
      throw error;
    }

    const documentPictureUrls = await uploadImages(req.files);
    const userId = req.user._id;

    const serviceProvider = new ServiceProvider({
      userId,
      companyName: req.body.companyName,
      qualification: req.body.qualification || '',
      missionStatement: req.body.missionStatement || '',
      additionalInformation: req.body.additionalInformation || '',
      services: req.body.services || [],
      preferredMethodOfContact: req.body.preferredMethodOfContact || '',
      availability: req.body.availability || {},
      documentPicture: documentPictureUrls.map(file => file.url),
    });

    const savedServiceProvider = await serviceProvider.save();
    res.status(201).json(savedServiceProvider);
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') { 
      res.status(400).json({ message: err.message }); 
    } else if (err.code === 11000) { 
      res.status(409).json({ message: 'Duplicate service provider detected' });
    } else { 
      res.status(500).json({ message: 'Error creating service provider' });
    }
  }
};



export const getLatestServices = async (req, res) => {
    try {
      // Aggregate pipeline to group documents by userId and get the latest service for each user
      const latestServices = await ServiceProvider.aggregate([
        // Sort documents by createdAt field in descending order
        { $sort: { createdAt: -1 } },
        // Group documents by userId and get the first document for each group (latest service)
        {
          $group: {
            _id: '$userId',
            companyName: { $first: '$companyName' },
            qualification: { $first: '$qualification' },
            certification: { $first: '$certification' },
            missionStatement: { $first: '$missionStatement' },
            additionalInformation: { $first: '$additionalInformation' },
            services: { $first: '$services' },
            preferredMethodOfContact: { $first: '$preferredMethodOfContact' },
            availability: { $first: '$availability' },
            documentPicture: { $first: '$documentPicture' },
            createdAt: { $first: '$createdAt' }
          }
        }
      ]);
  
      res.status(200).json(latestServices);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching latest services' });
    }
  };
  