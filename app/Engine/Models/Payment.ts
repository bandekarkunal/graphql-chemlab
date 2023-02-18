import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../Loaders/database';

interface paymentsAttributes {
    id?: bigint;
    user_id?: bigint;
    payment_request_id?: string;
    razorpay_payment_id?: string;
    amount_paid?: DoubleRange;
    ip_address?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

interface paymentsCreationAttributes extends Optional<paymentsAttributes, "id"> { }

export class Payment extends Model<paymentsAttributes, paymentsCreationAttributes> implements paymentsAttributes {
    public id?: bigint;
    public user_id?: bigint;
    public payment_request_id?: string;
    public razorpay_payment_id?: string;
    public amount_paid?: DoubleRange;
    public ip_address?: string;

    public deleted_at?: Date;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Payment.init(
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

        payment_request_id: {
            allowNull: false,
            type: DataTypes.STRING
        },

        razorpay_payment_id: {
            allowNull: true,
            type: DataTypes.STRING
        },

        amount_paid: {
            allowNull: true,
            type: DataTypes.DOUBLE
        },

        ip_address: {
            allowNull: true,
            type: DataTypes.STRING
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
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        tableName: "payments",
        sequelize: sequelize,
        paranoid: true
    }
)
