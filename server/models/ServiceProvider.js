import mongoose from "mongoose"

// Define the schema for ServiceProvider
const serviceProviderSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    default: "",
  },
  missionStatement: {
    type: String,
    default: "",
  },
  additionalInformation: {
    type: String,
    default: "",
  },
  services: [
    {
      description: {
        type: String,
      },
      pricing: {
        type: Number,
      },
      portfolioLink: {
        type: String,
        default: "",
      },
    },
  ],
  preferredMethodOfContact: {
    type: String,
    default: "",
  },
  availability: {
    type: String,
  },
  documentPicture: [
    {
      type: String,
    },
  ],
})

export default mongoose.model("ServiceProvider", serviceProviderSchema)
