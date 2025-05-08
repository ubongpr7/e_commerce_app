const HoverImage2 = () => {
    return (
      <div
        className="relative mt-4 w-56 mr-14 bg-cover bg-center overflow-hidden rounded-lg"
        style={{
          backgroundImage:
            'url(https://sdmntpreastus2.oaiusercontent.com/files/00000000-ae60-61f6-afb7-e2ef20d2803a/raw?se=2025-05-08T06%3A08%3A31Z&sp=r&sv=2024-08-04&sr=b&scid=00000000-0000-0000-0000-000000000000&skoid=82a3371f-2f6c-4f81-8a78-2701b362559b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-08T05%3A02%3A54Z&ske=2025-05-09T05%3A02%3A54Z&sks=b&skv=2024-08-04&sig=n3jpHWJjms/28G65EifXUH6UlFe4i5k0/C0OXNLgh1A%3D)',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-100">
          <div className="absolute top-0 right-0 flex justify-center space-x-4">
            {/* Test with div to check if animation works */}
            <div className="w-16 h-16 bg-main-red rounded-full animate-heartbeat-3d" />
          </div>
        </div>
      </div>
    );
  };
  
  export default HoverImage2;
  