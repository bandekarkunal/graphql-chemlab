import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../Loaders/database';
import bcrypt from 'bcryptjs';

import { Role } from './Role';
import { State } from './State';
import { City } from './City';

export interface usersAttributes {
    id?: bigint;
    uuid?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    photo?: string;
    gender?: string;
    dob?: string;
    phone?: string;
    status?: string;
    state_id?: bigint;
    city_id?: bigint;

    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

export interface usersCreationAttributes extends Optional<usersAttributes, "id"> { }

export class User extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
    public id!: bigint;
    public uuid!: string;
    public first_name!: string;
    public last_name!: string;
    public email!: string;
    public password!: string;
    public photo!: string;
    public gender!: string;
    public dob!: string;
    public phone!: string;
    public status!: string;
    public state_id!: bigint;
    public city_id!: bigint;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
    public deleted_at!: Date;
}

User.init(
    {

        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },

        uuid: {
            allowNull: false,
            type: DataTypes.UUID
        },

        first_name: {
            allowNull: true,
            type: DataTypes.STRING
        },

        last_name: {
            allowNull: true,
            type: DataTypes.STRING
        },

        email: {
            allowNull: true,
            type: DataTypes.STRING
        },

        password: {
            allowNull: true,
            type: DataTypes.STRING
        },

        photo: {
            allowNull: true,
            type: DataTypes.STRING,
            get() {
                return `${process.env.AWS_BASE_URL}${this.getDataValue('photo')}`;
            }
        },

        gender: {
            allowNull: true,
            type: DataTypes.STRING(20)
        },

        dob: {
            allowNull: true,
            type: DataTypes.DATE
        },

        phone: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },

        status: {
            allowNull: false,
            type: DataTypes.STRING(50),
            defaultValue: 'active'
        },

        state_id: {
            allowNull: true,
            type: DataTypes.BIGINT,
            references: {
                model: 'states',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },

        city_id: {
            allowNull: true,
            type: DataTypes.BIGINT,
            references: {
                model: 'cities',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },

        created_at: {
            allowNull: false,
            type: DataTypes.DATE
        },

        updated_at: {
            allowNull: false,
            type: DataTypes.DATE
        },

        deleted_at: {
            allowNull: true,
            type: DataTypes.DATE
        }

    },
    {
        defaultScope: {},
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    user.password = await bcrypt.hash(user.password, 8);
                }
            }
        },
        tableName: "users",
        sequelize,
        underscored: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
)

User.belongsToMany(Role, { through: 'user_roles', as: 'roles' })
User.belongsTo(State, { as: 'state', foreignKey: 'state_id' })
User.belongsTo(City, { as: 'city', foreignKey: 'city_id' })