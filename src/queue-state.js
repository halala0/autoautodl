'use strict';
// Read-only refresh is intentionally not a blocker for starting a queue.
function queueAvailability(s){
  let reason='';
  if(!s.connected)reason='请先登录 AutoDL，等待账号验证完成。';
  else if(!s.instances.some(i=>i.id===s.target))reason='请先在上方选择一个已有实例。';
  else if(s.pending)reason='上次电源请求正在自动核实，请等待确认结果。';
  else if(s.actionBusy)reason='正在提交操作，请等待完成。';
  const monitorReason=reason;
  if(!reason&&s.oneMachine)reason=s.oneMachine.done?'上次候补已经完成；点击“结束旧候补并解除锁定”后可以开始新一轮。':'系统正在核实旧提交；确认旧目标已关机后会自动归档并解除锁定。';
  if(!reason&&s.watching)reason='当前监控正在运行，请先点击停止再开始新的候补。';
  if(!reason&&(s.rentalTasks||[]).some(t=>t.id===s.homeTask&&['queued','watching','preparing','submitting','verifying','reconciling'].includes(t.state)))reason='当前克隆候补正在运行，请先停止或等待结果。';
  return {reason,monitorReason};
}
if(typeof module!=='undefined')module.exports={queueAvailability};
