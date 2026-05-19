const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    projectName: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
    },
    businessName: { type: String, trim: true },
    category: { type: String, trim: true },
    businessInfo: {
      services: { type: String },
      targetAudience: { type: String },
      description: { type: String },
      tone: { type: String },
      colorTheme: { type: String },
      contactEmail: { type: String },
      contactPhone: { type: String },
      address: { type: String },
    },
    websiteData: {
      hero: {
        title: String,
        subtitle: String,
        buttonText: String,
        backgroundImage: String,
      },
      about: {
        title: String,
        description: String,
        image: String,
      },
      services: [
        {
          title: String,
          description: String,
          icon: String,
          image: String,
        },
      ],
      testimonials: [
        {
          name: String,
          role: String,
          text: String,
          avatar: String,
        },
      ],
      faq: [
        {
          question: String,
          answer: String,
        },
      ],
      cta: {
        title: String,
        description: String,
        buttonText: String,
      },
      contact: {
        title: String,
        description: String,
        email: String,
        phone: String,
        address: String,
      },
      seo: {
        metaTitle: String,
        metaDescription: String,
        keywords: [String],
      },
      colorTheme: {
        primary: String,
        secondary: String,
        accent: String,
      },
    },
    generatedImages: [
      {
        type: String,
        url: String,
        prompt: String,
        generatedAt: { type: Date, default: Date.now },
      },
    ],
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
