import { Schema } from 'mongoose';

export const CategoryModel = new Schema(
  {
    category: { type: String, unique: true },
    description: { type: String },
    events: [
      {
        name: { type: String },
        operation: { type: String },
        value: { type: Number },
      },
    ],
    players: [
      {
        type: Schema.Types.ObjectId,
        ref: 'player',
      },
    ],
  },
  {
    timestamps: true,
    collection: 'categories',
  },
);
