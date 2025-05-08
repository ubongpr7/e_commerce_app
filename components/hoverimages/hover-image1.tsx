const HoverImage1 = () => {
    return (
      <div
        className="relative mt-4 w-56 ml-14 bg-cover bg-center overflow-hidden rounded-lg"
        style={{
          backgroundImage:
            'url(https://sdmntprukwest.oaiusercontent.com/files/00000000-69c0-6243-a4ca-916d9264421c/raw?se=2025-05-08T08%3A18%3A20Z&sp=r&sv=2024-08-04&sr=b&scid=310bd032-7555-5b5f-9ed5-06d3c073c3e3&skoid=06e05d6f-bdd9-4a88-a7ec-2c0a779a08ca&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-08T07%3A15%3A43Z&ske=2025-05-09T07%3A15%3A43Z&sks=b&skv=2024-08-04&sig=ks0zXY7eXJcrCIoHFcG84D9pW2PaH3ORvleW8Uj9L8Q%3D)',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-100">
          <div className="absolute top-0 left-0 flex justify-center space-x-4">
            {/* Test with div to check if animation works */}
            <div className="w-16 h-16 bg-main-red rounded-full animate-heartbeat-3d" />
          </div>
        </div>
      </div>
    );
  };
  
  export default HoverImage1;
  