import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../Loaders/database';
import { Book } from './Book';

interface userPurchasedBookAttributes {
    id?: bigint;
    user_id?: bigint;
    book_id?: bigint;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

interface userPurchasedBookCreationAttributes extends Optional<userPurchasedBookAttributes, "id"> { }

export class UserPurchasedBook extends Model<userPurchasedBookAttributes, userPurchasedBookCreationAttributes> implements userPurchasedBookAttributes {
    public id?: bigint;
    public user_id?: bigint;
    public book_id?: bigint;

    public deleted_at?: Date;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

UserPurchasedBook.init(
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
        tableName: "user_purchased_books",
        sequelize: sequelize,
        paranoid: true
    }
)

UserPurchasedBook.belongsTo(Book, { as: 'book', foreignKey: 'book_id' })