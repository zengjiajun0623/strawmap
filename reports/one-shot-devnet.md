# One-shot Lean Ethereum devnet

Scenario id: `one-shot-devnet`
Status: **pass**

## Summary

- Final head: `slot-1`
- Total multidimensional fee: `877`
- Private frames: `1`
- State classes: `utxo, dynamic, ring-buffer`
- Proof verified: `true`
- Dependency graph valid: `true`

## Assertions

| Check | Status | Actual | Expected |
| --- | --- | --- | --- |
| proofVerified | pass | `true` | `true` |
| dependencyGraphValid | pass | `true` | `true` |
| finalHead | pass | `slot-1` | `slot-1` |
| minPrivateFrames | pass | `1` | `>= 1` |
| maxTotalFee | pass | `877` | `<= 1000` |
| includesStateClass:utxo | pass | `utxo, dynamic, ring-buffer` | `utxo` |
| includesStateClass:dynamic | pass | `utxo, dynamic, ring-buffer` | `dynamic` |
| includesStateClass:ring-buffer | pass | `utxo, dynamic, ring-buffer` | `ring-buffer` |

## Gas Vectors

| Transaction | State class | Fee | Compute | State writes | Proof | Privacy |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| erc20-utxo-transfer | utxo | 298 | 18 | 2 | 22 | 18 |
| uniswap-dynamic-swap | dynamic | 431 | 45 | 15 | 22 | 0 |
| rollup-blob-sample | ring-buffer | 148 | 14 | 1 | 22 | 0 |

## State Custody

| State object | Class | Custodians |
| --- | --- | --- |
| erc20-utxo-transfer | utxo | reth-proof, erigon-state |
| uniswap-dynamic-swap | dynamic | reth-proof, teku-pq |
| rollup-blob-sample | ring-buffer | erigon-state, reth-proof |

## Proof Inputs

```json
{
  "blockNumber": 1,
  "txRoot": "ce57fafcd4e1e39cbbde8550616f93a1c0ff9810a0881ae9c68404acf709f0e8",
  "stateRoot": "3713ef012d82ea9d370edb0cbf3a56f981fddb26280e5c95dd9d0a7b32ab93ea",
  "vmTraceRoot": "defa71ec60d53b089b108ce42c2503b63200dc860ed2aefe4a991f7e026cce6c",
  "parentProof": null
}
```
