import { SyntheticEvent, useEffect, useState } from "react";
import GiftModel from "../../../Models/GiftModel";
import TargetModel from "../../../Models/TargetModel";
import giftsService from "../../../Services/gifts-service";
import "./GiftList.css";

function GiftList(): JSX.Element {
  const [targets, setTargets] = useState<TargetModel[]>([]);
  const [gifts, setGifts] = useState<GiftModel[]>([]);

  useEffect(() => {
    giftsService
      .getAllTargets()
      .then((targets) => setTargets(targets))
      .catch((err) => alert(err.message));
  }, []);

  async function handleChange(args: SyntheticEvent) {
    try {
      const targetId = +(args.target as HTMLSelectElement).value;
      const gifts = await giftsService.getGiftsByTarget(targetId);
      setGifts(gifts);
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="GiftList">
      <select onChange={handleChange} defaultValue="">
        <option disabled value="">
          Select Target Audience
        </option>
        {targets.map((t) => (
          <option value={t.targetId} key={t.targetId}>
            {t.name}
          </option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            <th>Target Audience</th>
            <th>Gift Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Discount</th>
          </tr>
        </thead>
        <tbody>
          {gifts.map((g) => (
            <tr key={g.giftId}>
              <td>{g.targetName}</td>
              <td>{g.giftName}</td>
              <td>{g.description}</td>
              <td>{g.price}</td>
              <td>{g.discount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GiftList;
