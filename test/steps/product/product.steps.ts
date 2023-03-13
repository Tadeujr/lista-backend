import { binding, given, then, when } from 'cucumber-tsflow';
import { assert } from 'chai';

@binding()
export class ProductSteps {
    private accountBalance: number = 0;
    private dado: string;
    private quando: string;
    private entao: string;

    @given('que eu esteja na página de produtos')
    public givenAnAccountWithStartingBalance() {
        this.dado = 'dado';
        this.accountBalance = 1;
    }

    @when('eu adicionar um produto ao carrinho')
    public giveAddProduct() {
        this.quando = 'quando';
    }

    @then('eu deveria ver o produto adicionado ao carrinho')
    public resultProduct() {
        const a = 1;
        assert.equal(this.accountBalance, a, 'Not pass');
        assert.equal(this.dado, 'dado', '\n Test Not pass');
    }
}
