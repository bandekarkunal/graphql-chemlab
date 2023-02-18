import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../Loaders/database';
import { Author } from './Author';
import { Book } from './Book';

interface bookAuthorAttributes {
    id?: bigint;
    book_id?: bigint;
    author_id?: bigint;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

interface bookAuthorCreationAttributes extends Optional<bookAuthorAttributes, "id"> { }

export class BookAuthor extends Model<bookAuthorAttributes, bookAuthorCreationAttributes> implements bookAuthorAttributes {
    public id?: bigint;
    public book_id?: bigint;
    public author_id?: bigint;

    public deleted_at?: Date;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

BookAuthor.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },

        book_id: {
            allowNull: false,
            type: DataTypes.BIGINT,
            references: {
                model: 'books',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },

        author_id: {
            allowNull: false,
            type: DataTypes.BIGINT,
            references: {
                model: 'authors',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
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
        tableName: "book_authors",
        sequelize: sequelize,
        paranoid: true,
    }
)

BookAuthor.belongsTo(Author, { as: 'author', foreignKey: 'author_id' })
Author.hasMany(BookAuthor, { as: 'book_authors', foreignKey: 'author_id' })
