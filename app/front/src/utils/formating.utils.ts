class FormatingUtils {
  private readonly currencyFormatter: Intl.NumberFormat;

  constructor() {
    this.currencyFormatter = Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  public currency(num: number | bigint) {
    return this.currencyFormatter.format(num);
  }
}

const formatingUtils = new FormatingUtils();
export default formatingUtils;
