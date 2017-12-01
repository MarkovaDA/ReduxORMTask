import { ORM } from 'redux-orm';
import { Category } from '../models/Category';
import { Position } from '../models/Position';
import { Estimate } from '../models/Estimate';
import { Skill } from '../models/Skill';
import { Employee } from '../models/Employee';

export const schema = new ORM();
schema.register(Category, Position, Estimate, Skill, Employee);

