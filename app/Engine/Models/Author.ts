import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../Loaders/database';

interface authorAttributes {
    id?: bigint;
    uuid?: string;
    name?: string;
    image?: string;
    status?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

interface authorCreationAttributes extends Optional<authorAttributes, "id"> { }

export class Author extends Model<authorAttributes, authorCreationAttributes> implements authorAttributes {
    public id?: bigint;
    public uuid?: string;
    public name?: string;
    public image?: string;
    public status?: string;

    public deleted_at?: Date;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Author.init(
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

        image: {
            allowNull: false,
            type: DataTypes.STRING,
            get() {
                return `${process.env.AWS_BASE_URL}${this.getDataValue('image')}`;
            }
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
        tableName: "authors",
        sequelize: sequelize,
        paranoid: true,
    }
)
