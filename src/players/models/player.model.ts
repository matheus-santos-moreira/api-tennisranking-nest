import { Schema } from 'mongoose';

export const PlayerModel = new Schema(
  {
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    name: { type: String },
    ranking: { type: String },
    rankingPosition: { type: String },
    avatarUrl: { type: String },
  },
  {
    timestamps: true,
    collection: 'players',
  },
);
