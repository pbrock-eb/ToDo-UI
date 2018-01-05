class Beer {
    id: string;
    name: string;
    description: string;
    foodPairings: string;
    originalGravity: string;
    abv: string;
    ibu: string;
    glass: string;
    style: object;
    isOrganic: string;
    labels: object;
    servingTemperature: string;
    available: object;
    beerVariation: object;
    year: string;

    constructor(
    ) {
        this.id = '';
        this.name = '';
        this.description = '';
        this.foodPairings = '';
        this.originalGravity = '';
        this.abv = '';
        this.ibu = '';
        this.glass = '';
        this.style = {};
        this.isOrganic = '';
        this.labels = {};
        this.servingTemperature = '';
        this.available = {};
        this.beerVariation = {};
        this.year = '';
    }

}

export default Beer;
