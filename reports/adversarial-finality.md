# Availability without finality

Scenario id: `adversarial-finality`
Status: **pass**

## Summary

- Final head: `none`
- Total multidimensional fee: `426`
- Private frames: `1`
- State classes: `keyed-nonce, temp`
- Proof verified: `true`
- Dependency graph valid: `true`

## Assertions

| Check | Status | Actual | Expected |
| --- | --- | --- | --- |
| proofVerified | pass | `true` | `true` |
| dependencyGraphValid | pass | `true` | `true` |
| finalHead | pass | `null` | `null` |
| minPrivateFrames | pass | `1` | `>= 1` |
| maxTotalFee | pass | `426` | `<= 700` |
| includesStateClass:keyed-nonce | pass | `keyed-nonce, temp` | `keyed-nonce` |
| includesStateClass:temp | pass | `keyed-nonce, temp` | `temp` |

## Gas Vectors

| Transaction | State class | Fee | Compute | State writes | Proof | Privacy |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| keyed-nonce-transfer | keyed-nonce | 146 | 12 | 1 | 22 | 0 |
| temporary-privacy-session | temp | 280 | 20 | 1 | 22 | 18 |

## State Custody

| State object | Class | Custodians |
| --- | --- | --- |
| keyed-nonce-transfer | keyed-nonce | lighthouse-pq, reth-proof |
| temporary-privacy-session | temp | lighthouse-pq, nimbus-pq |

## Proof Inputs

```json
{
  "blockNumber": 1,
  "txRoot": "711d837922b7d7de7a9f7f545b941f197e0b23ccaa96a449207da4b8e5cab3cc",
  "stateRoot": "6d39f6e4720e75767207f9ee18b25183e39d2fb3dbb1969e591124b8f556acff",
  "vmTraceRoot": "47d331c16b005694b389b1c9ef45bfc3051129e3b43bb82741ff5b3a1bc5e2a6",
  "parentProof": null
}
```
