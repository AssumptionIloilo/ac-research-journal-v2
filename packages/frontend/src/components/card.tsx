import { CardItemsType } from "@/constants/static-data";

const Card = ({ icon, title, desc }: CardItemsType) => {
  return (
    <div className="bg-white rounded-lg w-full md:w-[320px] aspect-square flex flex-col items-center justify-center gap-y-2 p-5 shadow shadow-gray-500/10">
      <div className="flex-shrink-0 w-[100px] h-[100px]">
        <img src={icon} alt={title} width={100} height={100} />
      </div>
      <h3 className="text-dark-800 text-[18px] font-semibold mt-4 text-center">{title}</h3>
      <p className="text-center font-light text-dark-300 text-[16px]">{desc}</p>
    </div>
  );
};

export default Card;
