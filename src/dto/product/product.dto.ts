import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductE } from '../../entities/product.entity';

export class ProductDto {
    id?: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    store: string;

    @IsString()
    @ApiProperty()
    category: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    productName: string;

    @IsString()
    @ApiProperty()
    brand: string;

    @ApiProperty()
    price: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    buyDate: string;

    @IsNotEmpty({ message: 'Enter an integer value.' })
    @ApiProperty()
    unity: number;

    @ApiProperty()
    commercialUnit?: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    wasAcquired: boolean;

    @IsNumber()
    @ApiProperty({ type: Number })
    list: ProductE['list'];

    constructor(
        store?: string,
        category?: string,
        productName?: string,
        brand?: string,
        price?: number,
        buyDate?: string,
        unity?: number,
        commercialUnit?: string,
        wasAcquired?: boolean,
        list?: any,
    ) {
        this.store = store;
        this.category = category;
        this.productName = productName;
        this.brand = brand;
        this.price = price;
        this.buyDate = buyDate;
        this.unity = unity;
        this.commercialUnit = commercialUnit;
        this.wasAcquired = wasAcquired;
        this.list = list;
    }
}
