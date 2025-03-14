import { FC } from "react";

type EditorialBoardCardProps = {
  profileImageURL?: string;
  name: string;
  subtitle: string;
};

const EditorialBoardMemberCard: FC<EditorialBoardCardProps> = (props) => {
  return (
    <div className="flex flex-col gap-y-4 items-center max-w-[150px]">
      <img
        alt=""
        width={96}
        height={96}
        // Src: for testing:
        // src="https://publications.assumptioniloilo.edu.ph/_next/image?url=https%3A%2F%2Fpublications.assumptioniloilo.edu.ph%2Fmedia%2FIMG_8820.JPG&w=3840&q=75"
        src={props.profileImageURL}
        className="bg-primary-200 text-xs rounded-full w-24 h-24 object-cover object-center"
      />

      <div className="flex flex-col items-center">
        <p className="font-medium text-center text-sm">{props.name}</p>
        <p className="opacity-80 text-sm text-center">{props.subtitle}</p>
      </div>
    </div>
  );
};

export default EditorialBoardMemberCard;
