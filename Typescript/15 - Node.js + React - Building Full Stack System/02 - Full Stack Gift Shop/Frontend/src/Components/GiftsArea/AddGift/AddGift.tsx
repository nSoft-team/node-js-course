import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import GiftModel from "../../../Models/GiftModel";
import TargetModel from "../../../Models/TargetModel";
import giftsService from "../../../Services/gifts-service";
import "./AddGift.css";

function AddGift(): JSX.Element {
  const [targets, setTargets] = useState<TargetModel[]>([]);
  const { register, handleSubmit, formState } = useForm<GiftModel>();
  const navigate = useNavigate();

  useEffect(() => {
    giftsService
      .getAllTargets()
      .then((targets) => setTargets(targets))
      .catch((err) => alert(err.message));
  }, []);

  async function submit(gift: GiftModel) {
    try {
      const addedGift = await giftsService.addGift(gift);
      alert("Gift added, id: " + addedGift.giftId);
      navigate("/gift-list");
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="AddGift">
      <form onSubmit={handleSubmit(submit)} noValidate>
        <label>Target Audience: </label>
        <select
          {...register("targetId", {
            required: { value: true, message: "Missing target audience" },
          })}
          defaultValue=""
        >
          <option disabled value="">
            Select Target Audience
          </option>
          {targets.map((t) => (
            <option value={t.targetId} key={t.targetId}>
              {t.name}
            </option>
          ))}
        </select>
        <span>{formState.errors?.targetId?.message}</span>

        <label>Gift Name: </label>
        <input
          type="text"
          {...register("giftName", {
            required: { value: true, message: "Missing gift name" },
          })}
        />
        <span>{formState.errors?.giftName?.message}</span>

        <label>Description: </label>
        <input
          type="text"
          {...register("description", {
            required: { value: true, message: "Missing description" },
          })}
        />
        <span>{formState.errors?.description?.message}</span>

        <label>Price: </label>
        <input
          type="number"
          step="0.01"
          min="0"
          {...register("price", {
            required: { value: true, message: "Missing price" },
            min: { value: 0, message: "Price can't be negative" },
          })}
        />
        <span>{formState.errors?.price?.message}</span>

        <label>Discount: </label>
        <input
          type="number"
          step="0.01"
          {...register("discount", {
            required: { value: true, message: "Missing discount" },
            min: { value: 0, message: "Discount can't be negative" },
            max: { value: 100, message: "Discount can't exceed 100" },
          })}
        />
        <span>{formState.errors?.discount?.message}</span>

        <button>Add</button>
      </form>
    </div>
  );
}

export default AddGift;
