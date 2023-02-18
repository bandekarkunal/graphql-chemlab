import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../Loaders/database';

interface subCategoryAttributes {
    id?: bigint;
    category_id?: bigint;
    name?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

interface subCategoryCreationAttributes extends Optional<subCategoryAttributes, "id"> { }

export class SubCategory extends Model<subCategoryAttributes, subCategoryCreationAttributes> implements subCategoryAttributes {
    public id?: bigint;
    public category_id?: bigint;
    public name?: string;

    public deleted_at?: Date;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

SubCategory.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },

        category_id: {
            allowNull: false,
            type: DataTypes.BIGINT,
            references: {
                model: 'categories',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },

        name: {
            allowNull: false,
            type: DataTypes.STRING
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
        tableName: "sub_categories",
        sequelize: sequelize,
        paranoid: true
    }
)
