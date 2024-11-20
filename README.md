# ptx-veracity-assurance

### Prerequisites
The evaluation can be tested using the demo exchange: [ptx-demo-exchange](https://github.com/botondklenk/ptx-demo-exchange).

In the ptx-contract-manager and ptx-dataspace-connector repositories you need to checkout the `veracity-evaluation` branch.

### Start the services
In the fabric-network folder:
```bash
fablo up
```
> **Note**: 
> `Fablo` is only avaible for linux. If you are using Windows, you start it in WSL, and you will see the containers on windows if you have Docker Desktop installed and use the WSL 2 backend. \
> You need to have the `fablo` CLI installed. You can find the installation instructions [here](https://github.com/hyperledger-labs/fablo).

In the root folder:
```bash
docker compose up -d --build
docker network connect ptx fablo-rest.bme.hu
docker network connect ptx fablo-rest.uni-x.com
```