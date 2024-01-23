FROM mcr.microsoft.com/dotnet/sdk:8.0 AS base
WORKDIR /app
EXPOSE 5201

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["tt-backend.csproj", "."]
RUN dotnet restore "tt-backend.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "tt-backend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "tt-backend.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "tt-backend.dll"]

ENV ASPNETCORE_URLS=http://+:5201
