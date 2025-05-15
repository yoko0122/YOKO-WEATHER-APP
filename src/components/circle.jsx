
export const Circle = () => {
  return (
    <div className="relative inset-0 z-5 flex items-center justify-center">
      <div className="absolute border border-gray-300 w-[140px] h-[140px] rounded-full"></div>
      <div className="absolute border border-gray-300 w-[340px] h-[340px] rounded-full"></div>
      <div className="absolute border border-gray-300 w-[540px] h-[540px] rounded-full"></div>
      <div className="absolute border border-gray-300 w-[940px] h-[940px] rounded-full"></div>

      <div className="absolute flex items-center justify-center w-[140px] h-[140px] bg-[#F3F4F6] rounded-full ">
        <div className="relative">
          <div className="absolute -top-[114px] left-[49px] w-10 h-14 bg-[#F3F4F6]"></div>
          <div className="absolute -top-[117px] left-[50px] w-20 h-16 bg-[#0F141E] rounded-bl-full"></div>
        </div>
        <div className="flex gap-3">
          <div className="flex">
            <span>
              <img src="/left.png" alt="left" />
            </span>
          </div>
          <div className="flex">
            <span>
              <img src="/right.png" alt="right" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
