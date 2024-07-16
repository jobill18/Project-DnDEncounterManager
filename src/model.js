import { DataTypes, Model } from "sequelize";
import util from "util";
import connectToDB from "./db.js";
import { type } from "os";

export const db = await connectToDB("postgres://josep:admin@localhost:5432/");

export class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

export class Encounter extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

export class Monster extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "user",
    sequelize: db,
  }
);

Encounter.init(
  {
    encounterId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    encounterName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    modelName: "encounter",
    sequelize: db,
  }
);

Monster.init(
  {
    monsterId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    monsterName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    monsterUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "monster",
    sequelize: db,
  }
);

User.hasMany(Encounter, { foreignKey: "userId" });
Encounter.belongsTo(User, { foreignKey: "userId" });

Encounter.hasMany(Monster, { foreignKey: "encounterId" });
Monster.belongsTo(Encounter, { foreignKey: "encounterId" });
