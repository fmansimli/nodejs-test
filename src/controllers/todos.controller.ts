import type { RequestHandler } from "express";
import { Todo } from "../models/todo";

export const create: RequestHandler = async (req, res, next) => {
  const { completed, title } = req.body as Todo;
  try {
    res.status(200).json({ completed, title });
  } catch (error) {
    next(error);
  }
};

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    res.status(200).json({ todos: [] });
  } catch (error) {
    next(error);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  try {
    res.status(200).json({ todo: {} });
  } catch (error) {
    next(error);
  }
};

export const updateById: RequestHandler = async (req, res, next) => {
  const { completed, title } = req.body as Todo;
  try {
    res.status(200).json({ todo: { completed, title } });
  } catch (error) {
    next(error);
  }
};

export const deleteById: RequestHandler = async (req, res, next) => {
  try {
    res.status(200).json({ todo: { _id: 34 } });
  } catch (error) {
    next(error);
  }
};

export const deleteAll: RequestHandler = async (req, res, next) => {
  try {
    res.status(200).json({ todos: [] });
  } catch (error) {
    next(error);
  }
};
