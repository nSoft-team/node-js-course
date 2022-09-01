import axios from "axios";
import GiftModel from "../Models/GiftModel";
import TargetModel from "../Models/TargetModel";
import config from "../Utils/Config";

class GiftsService {
  // Get all targets:
  public async getAllTargets(): Promise<TargetModel[]> {
    const response = await axios.get<TargetModel[]>(config.targetsUrl);
    return response.data;
  }

  // Get gifts by target id:
  public async getGiftsByTarget(targetId: number): Promise<GiftModel[]> {
    const response = await axios.get<GiftModel[]>(
      config.giftsByTargetUrl + targetId
    );
    return response.data;
  }

  // Add gift:
  public async addGift(gift: GiftModel): Promise<GiftModel> {
    const response = await axios.post<GiftModel>(config.giftsUrl, gift);
    return response.data;
  }
}

const giftsService = new GiftsService();

export default giftsService;
