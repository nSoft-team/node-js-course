class GiftModel {
  public giftId: number;
  public targetId: number;
  public giftName: string;
  public description: string;
  public price: number;
  public discount: number;

  public constructor(gift: GiftModel) {
    this.giftId = gift.giftId;
    this.targetId = gift.targetId;
    this.giftName = gift.giftName;
    this.description = gift.description;
    this.price = gift.price;
    this.discount = gift.discount;
  }
}

export default GiftModel;
