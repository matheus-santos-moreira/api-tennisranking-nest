import { Schema } from 'mongoose';

export const ChallengesModel = new Schema(
  {
    dateChallenge: { type: Date, required: true },
    status: { type: String, required: true },
    dateCreated: { type: Date, required: true },
    dateUpdated: { type: Date, required: true },
    requester: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
    category: { type: String, required: true },
    players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
    game: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
  },
  {
    timestamps: true,
    collection: 'challenges',
  },
);
