import { OkPacket } from "mysql";
import GiftModel from "../03-models/gift-model";
import TargetModel from "../03-models/target-model";
import dal from "../04-dal/dal";

async function getAllTargets(): Promise<TargetModel[]> {
  const sql = "SELECT * FROM targets";
  const targets = await dal.execute(sql);
  return targets;
}

async function getGiftsByTarget(targetId: number): Promise<GiftModel[]> {
  // Simple select:
  // const sql = "SELECT * FROM gifts WHERE targetId = ?;

  // Select with sorting:
  // const sql = "SELECT * FROM gifts WHERE targetId = ? ORDER BY price, discount";

  // Select with join and sorting:
  const sql = `SELECT gifts.*, targets.name as targetName
                 FROM gifts JOIN targets
                 ON gifts.targetId = targets.targetId
                 WHERE gifts.targetId = ?
                 ORDER BY price, discount`;

  const gifts = await dal.execute(sql, [targetId]);
  return gifts;
}

async function addGift(gift: GiftModel): Promise<GiftModel> {
  const sql = "INSERT INTO gifts VALUES(DEFAULT, ?, ?, ?, ?, ?)";
  const info: OkPacket = await dal.execute(sql, [
    gift.targetId,
    gift.giftName,
    gift.description,
    gift.price,
    gift.discount,
  ]);
  gift.giftId = info.insertId;
  return gift;
}

export default {
  getAllTargets,
  getGiftsByTarget,
  addGift,
};
