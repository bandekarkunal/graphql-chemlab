import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../Loaders/database';
import { BookAuthor } from './BookAuthor';
import { Category } from './Category';
import { Language } from './Language';
import { Publisher } from './Publisher';
import { SubCategory } from './SubCategory';
import { Type } from './Type';

interface bookAttributes {
    id?: bigint;
    uuid?: string;
    title?: string;
    category_id?: bigint;
    sub_category_id?: bigint;
    type_id?: bigint;
    language_id?: bigint;
    publisher_id?: bigint;
    published_on?: Date;
    points_to_buy?: number;
    front_cover?: string;
    back_cover?: string;
    soft_copy?: string;
    status?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

interface bookCreationAttributes extends Optional<bookAttributes, "id"> { }

export class Book extends Model<bookAttributes, bookCreationAttributes> implements bookAttributes {
    public id?: bigint;
    public uuid?: string;
    public title?: string;
    public category_id?: bigint;
    public sub_category_id?: bigint;
    public type_id?: bigint;
    public language_id?: bigint;
    public publisher_id?: bigint;
    public published_on?: Date;
    public points_to_buy?: number;
    public front_cover?: string;
    public back_cover?: string;
    public soft_copy?: string;
    public status?: string;

    public deleted_at?: Date;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Book.init(
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

        title: {
            allowNull: true,
            type: DataTypes.STRING
        },

        category_id: {
            allowNull: true,
            type: DataTypes.BIGINT,
            references: {
                model: 'categories',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },

        sub_category_id: {
            allowNull: true,
            type: DataTypes.BIGINT,
            references: {
                model: 'sub_categories',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },

        type_id: {
            allowNull: true,
            type: DataTypes.BIGINT,
            references: {
                model: 'types',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },

        language_id: {
            allowNull: true,
            type: DataTypes.BIGINT,
            references: {
                model: 'languages',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },

        publisher_id: {
            allowNull: true,
            type: DataTypes.BIGINT,
            references: {
                model: 'publishers',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },

        published_on: {
            allowNull: true,
            type: DataTypes.DATE
        },

        points_to_buy: {
            allowNull: true,
            type: DataTypes.INTEGER
        },

        front_cover: {
            allowNull: true,
            type: DataTypes.STRING,
            get() {
                if (this.getDataValue('front_cover')) {
                    return `${process.env.AWS_BASE_URL}${this.getDataValue('front_cover')}`;
                } else {
                    return this.getDataValue('front_cover');
                }
            }
        },

        back_cover: {
            allowNull: true,
            type: DataTypes.STRING,
            get() {
                if (this.getDataValue('back_cover')) {
                    return `${process.env.AWS_BASE_URL}${this.getDataValue('back_cover')}`;
                } else {
                    return this.getDataValue('back_cover');
                }
            }
        },

        soft_copy: {
            allowNull: true,
            type: DataTypes.STRING,
            get() {
                if (this.getDataValue('soft_copy')) {
                    return `${process.env.AWS_BASE_URL}${this.getDataValue('soft_copy')}`;
                } else {
                    return this.getDataValue('soft_copy');
                }
            }
        },

        status: {
            allowNull: false,
            type: DataTypes.STRING(50),
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
        tableName: "books",
        sequelize: sequelize,
        paranoid: true,
    }
)

Book.belongsTo(Publisher, { as: 'publisher', foreignKey: 'publisher_id' })
Book.belongsTo(Category, { as: 'category', foreignKey: 'category_id' })
Book.belongsTo(SubCategory, { as: 'sub_category', foreignKey: 'sub_category_id' })
Book.belongsTo(Language, { as: 'language', foreignKey: 'language_id' })
Book.belongsTo(Type, { as: 'type', foreignKey: 'type_id' })
BookAuthor.belongsTo(Book, { as: 'book', foreignKey: 'book_id' })

Book.hasMany(BookAuthor, { as: 'book_authors', foreignKey: 'book_id' })
