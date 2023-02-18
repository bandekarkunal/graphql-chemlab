import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../Loaders/database';

export interface authTokenAttributes {
    id?: bigint;
    user_id?: bigint;
    role_id?: bigint;
    token?: string;
    type?: string;
    expiry?: Date;
    status?: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface authTokenCreationAttributes extends Optional<authTokenAttributes, "id"> { }

export class AuthToken extends Model<authTokenAttributes, authTokenCreationAttributes> implements authTokenAttributes {
    public id?: bigint;
    public user_id?: bigint;
    public role_id?: bigint;
    public token?: string;
    public type?: string;
    public expiry?: Date;
    public status?: string;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

AuthToken.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },

        user_id: {
            allowNull: false,
            type: DataTypes.BIGINT,
            references: {
                model: 'users',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },

        role_id: {
            allowNull: true,
            type: DataTypes.BIGINT,
            references: {
                model: 'roles',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },

        type: {
            allowNull: false,
            type: DataTypes.STRING,
        },

        status: {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: "active"
        },

        token: {
            allowNull: false,
            type: DataTypes.STRING(500)
        },

        expiry: {
            allowNull: true,
            type: DataTypes.DATE
        },
    },
    {
        defaultScope: {},
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: "auth_tokens",
        sequelize: sequelize,
    }
)