var 
PUSH=0,
POP=1,
ADD=2,
SUB=3,
DIV=4,
MUL=5,
MOD=6,
INC=7,
DEC=8,
NEG=9,
RS=10,
LS=11,
SRS=12,
AND=13,
OR=14,
XOR=15,
NOT=16,
EQ=17,
NEQ=18,
GT=19,
LT=20,
GTE=21,
LTE=22,
JMPT=23,
JMPF=24,
CALL=25,
NCALL=26,
RET=27,
JLTE=28,
DUP=29;
var key={}
key['PUSH']=0;
key['POP']=1;
key['ADD']=2;
key['SUB']=3;
key['DIV']=4;
key['MUL']=5;
key['MOD']=6;
key['INC']=7;
key['DEC']=8;
key['NEG']=9;
key['RS']=10;
key['LS']=11;
key['SRS']=12;
key['AND']=13;
key['OR']=14;
key['XOR']=15;
key['NOT']=16;
key['EQ']=17;
key['NEQ']=18;
key['GT']=19;
key['LT']=20;
key['GTE']=21;
key['LTE']=22;
key['JMPT']=23;
key['JMPF']=24;
key['CALL']=25;
key['NCALL']=26;
key['RET']=27;
key['JLTE']=28;
key['DUP']=29;

function eval(program, natives,traceon) {
    
    function trace(cmd){
        if(traceon){
            console.log(cmd,s,pc,p);
        }
    }
    
    var fi = 0;
    var p = program[fi];
    var s = [];
    var call = [];
    var pc = 0;
    var op = p[pc];
    pc++;
    while (pc<p.length) {
        switch (op) {
            case ADD :
                s.push(s.pop() + s.pop());
                trace('ADD');
                break;
            case SUB:
                s.push(s.pop() - s.pop());
                trace('SUB');
                break;
            case DIV:
                s.push(s.pop() / s.pop());
                trace('DIV');
                break;
            case MUL:
                s.push(s.pop() * s.pop());
                trace('MUL');
                break;
            case MOD:
                s.push(s.pop() % s.pop());
                trace('MOD');
                break;
            case INC:
                s.push(s.pop()+1);
                trace('INC');
                break;
            case DEC:
                s.push(s.pop()-1);
                trace('DEC');
                break;
            case NEG:
                s.push(-1 * s.pop());
                trace('NEG');
                break;
            case LS:
                s.push(s.pop() << s.pop());
                trace('LS');
                break;
            case SRS:
                s.push(s.pop() >> s.pop());
                trace('SRS');
                break;
            case RS:
                s.push(s.pop() >>> s.pop());
                trace('RS');
                break;
            case AND:
                s.push(s.pop() & s.pop());
                trace('AND');
                break;
            case OR:
                s.push(s.pop() | s.pop());
                trace('OR');
                break;
            case XOR:
                s.push(s.pop() ^ s.pop());
                trace('XOR');
                break;
            case NOT:
                s.push(~s.pop());
                trace('NOT');
                break;
            case EQ:
                s.push(s.pop() === s.pop());
                trace('EQ');
                break;
            case NEQ:
                s.push(s.pop() !== s.pop());
                trace('NEQ');
                break;
            case GT:
                s.push(s.pop() > s.pop());
                trace('GT');
                break;
            case LT:
                s.push(s.pop() < s.pop());
                trace('LT');
                break;
            case GTE:
                s.push(s.pop() >= s.pop());
                trace('GTE');
                break;
            case LTE:
                s.push(s.pop() <= s.pop());
                trace('LTE');
                break;
            case JMPT:
                pc = (s.pop()) ? p[pc++]: pc;
                trace('JMPT');
                break;
            case JMPF:
                pc = (!s.pop()) ? p[pc++]: pc;
                trace('JMPF');
                break;
            case PUSH:
                s.push(p[pc]);
                pc++;
                trace('PUSH');
                break;
            case POP:
                s.pop();
                trace('POP');
                break;
            case CALL:
                call.push(fi);
                fi = p[pc];
                pc++;
                call.push(pc);
                p = program[fi];
                pc = 0;
                trace('CALL');
                break;
            case RET:
                pc = call.pop();
                fi = call.pop();
                p = program[fi];
                trace('RET');
                break;
            case NCALL:
                natives[p[pc]](s);
                pc++;
                trace('NCALL');
                break;
            case DUP:
                var v = s.pop();
                s.push(v);
                s.push(v);
                trace('DUP');
                break;
        }
        op = p[pc];
        pc++;
    }
    console.log('finish');
}



var natives = [];
natives.push(function(s) {
    console.log(s[s.length-1]);
});

//var add = [PUSH, 50, PUSH, 50, ADD,CALL,1, NCALL, 0];
//var sub = [PUSH,200,SUB,RET];
//var program = [add,sub];
var while_loop = [PUSH,23,INC,NCALL,0,DUP,PUSH,60,GT,JMPT,2];
var program =[while_loop];
console.log(program);
var start = new Date().getMilliseconds();
eval(program, natives,false);
var end = new Date().getMilliseconds();
console.log(start,end,end-start);

