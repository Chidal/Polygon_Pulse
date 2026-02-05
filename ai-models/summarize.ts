function summarizeTx(tx) {
  return `Summary: Transfer of ${tx.amount} ${tx.token} from ${tx.from.slice(0,6)} to ${tx.to.slice(0,6)}`;
}

module.exports = { summarizeTx };