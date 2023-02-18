import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../Loaders/database';

interface publishersAttributes {
    id?: bigint;
    uuid?: string;
    name?: string;
    status?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

interface publishersCreationAttributes extends Optional<publishersAttributes, "id"> { }

export class Publisher extends Model<publishersAttributes, publishersCreationAttributes> implements publishersAttributes {
    public id?: bigint;
    public name?: string;
    public uuid?: string;
    public status?: string;

    public deleted_at?: Date;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Publisher.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },

        uuid: {
            allowNull: false,
            type: DataTypes.STRING
        },

        name: {
            allowNull: false,
            type: DataTypes.STRING
        },

        status: {
            allowNull: false,
            type: DataTypes.STRING(50),
            defaultValue: 'active'
        },

        deleted_at: {
            allowNull: true,
            type: DataTypes.DATE
        }

    },
    {
        defaultScope: {},
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        tableName: "publishers",
        sequelize: sequelize,
        paranoid: true
    }
)
