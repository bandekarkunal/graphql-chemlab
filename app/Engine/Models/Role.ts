import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../Loaders/database';

interface roleAttributes {
    id?: bigint;
    slug?: string;
    name?: string;
    created_at?: Date;
    updated_at?: Date;
}

interface roleCreationAttributes extends Optional<roleAttributes, "id"> { }

export class Role extends Model<roleAttributes, roleCreationAttributes> implements roleAttributes {
    public id?: bigint;
    public slug?: string;
    public name?: string;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Role.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },

        slug: {
            allowNull: false,
            type: DataTypes.STRING
        },

        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
    },
    {
        defaultScope: {},
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: "roles",
        sequelize: sequelize,
    }
)