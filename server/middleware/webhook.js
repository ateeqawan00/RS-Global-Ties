import express from 'express'



export const rawJsonMiddleware = express.raw({ type: 'application/json' });