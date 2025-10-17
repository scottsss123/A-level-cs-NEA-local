class SimulationDescriptionBox extends TextBox {
    #linkedSimulationID;

    constructor(inX, inY, inWidth, inHeight, inLinkedSimulationID) {
        super(inX, inY, inWidth, inHeight, "");

        this.#linkedSimulationID = inLinkedSimulationID;
    }

    setLinkedSimulationID(inID) {
        this.#linkedSimulationID = inID;
    }
    getLinkedSimulationID() {
        return this.#linkedSimulationID;
    }

    updateContents(simulationMetaData) {
        let simulationName = simulationMetaData.Name;
        let simulationDescription = simulationMetaData.Description;
        let simulationID = simulationMetaData.SimulationID;

        let out = simulationName + "\n" + simulationDescription + "\n" + simulationID;

        super.updateContents(out);
    }
}