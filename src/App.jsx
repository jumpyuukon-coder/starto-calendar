import { useState, useMemo } from "react";

// ========== サンプルデータ（実際は編集してね） ==========
const EVENTS = [
  // --- 嵐 ---
  { id: 1, group: "嵐", type: "ライブ", title: "嵐 LIVE TOUR 2026", date: "2026-06-15", endDate: "2026-07-20", note: "東京ドーム・大阪・名古屋・札幌" },
  { id: 2, group: "嵐", type: "申込み期間", title: "嵐 LIVE TOUR FC先行", date: "2026-04-01", endDate: "2026-04-15", note: "Johnny's Club会員限定" },
  { id: 3, group: "嵐", type: "当落日", title: "嵐 LIVE TOUR FC先行 当落", date: "2026-04-25", note: "" },
  { id: 4, group: "嵐", type: "CD・円盤", title: "新シングル「未来へ」発売", date: "2026-05-20", note: "" },

  // --- SixTONES ---
  { id: 5, group: "SixTONES", type: "ライブ", title: "SixTONES LIVE 2026 SUMMER", date: "2026-07-05", endDate: "2026-08-30", note: "全国ドームツアー" },
  { id: 6, group: "SixTONES", type: "申込み期間", title: "SixTONES FC先行", date: "2026-05-10", endDate: "2026-05-20", note: "" },
  { id: 7, group: "SixTONES", type: "当落日", title: "SixTONES FC先行 当落", date: "2026-05-28", note: "" },
  { id: 8, group: "SixTONES", type: "CD・円盤", title: "アルバム「SPEAKER」発売", date: "2026-06-10", note: "" },

  // --- Snow Man ---
  { id: 9, group: "Snow Man", type: "ライブ", title: "Snow Man LIVE TOUR 2026", date: "2026-05-01", endDate: "2026-06-28", note: "" },
  { id: 10, group: "Snow Man", type: "申込み期間", title: "Snow Man 一般発売", date: "2026-04-20", endDate: "2026-04-27", note: "ぴあ・ローチケ" },
  { id: 11, group: "Snow Man", type: "当落日", title: "Snow Man 一般 抽選結果", date: "2026-05-03", note: "" },
  { id: 12, group: "Snow Man", type: "CD・円盤", title: "Blu-ray「2025 TOUR」発売", date: "2026-07-15", note: "" },

  // --- なにわ男子 ---
  { id: 13, group: "なにわ男子", type: "ライブ", title: "なにわ男子 DOME TOUR 2026", date: "2026-08-10", endDate: "2026-09-15", note: "" },
  { id: 14, group: "なにわ男子", type: "申込み期間", title: "なにわ男子 FC先行", date: "2026-06-01", endDate: "2026-06-10", note: "" },
  { id: 15, group: "なにわ男子", type: "当落日", title: "なにわ男子 FC先行 当落", date: "2026-06-20", note: "" },
  { id: 16, group: "なにわ男子", type: "CD・円盤", title: "シングル発売", date: "2026-05-27", note: "" },

  // --- King & Prince ---
  { id: 17, group: "King & Prince", type: "ライブ", title: "King & Prince LIVE 2026", date: "2026-09-05", endDate: "2026-10-12", note: "" },
  { id: 18, group: "King & Prince", type: "申込み期間", title: "キンプリ FC先行", date: "2026-07-01", endDate: "2026-07-10", note: "" },
  { id: 19, group: "King & Prince", type: "当落日", title: "キンプリ FC先行 当落", date: "2026-07-20", note: "" },
  { id: 20, group: "King & Prince", type: "舞台・その他", title: "平野紫耀 舞台出演", date: "2026-05-10", endDate: "2026-05-25", note: "" },

  // --- Travis Japan ---
  { id: 21, group: "Travis Japan", type: "ライブ", title: "Travis Japan WORLD TOUR 2026", date: "2026-06-20", endDate: "2026-07-30", note: "海外公演含む" },
  { id: 22, group: "Travis Japan", type: "CD・円盤", title: "新アルバム発売", date: "2026-05-13", note: "" },
  { id: 23, group: "Travis Japan", type: "当落日", title: "Travis Japan 一般当落", date: "2026-05-18", note: "" },

  // --- Hey! Say! JUMP ---
  { id: 24, group: "Hey! Say! JUMP", type: "ライブ", title: "Hey! Say! JUMP LIVE TOUR", date: "2026-10-01", endDate: "2026-11-20", note: "" },
  { id: 25, group: "Hey! Say! JUMP", type: "CD・円盤", title: "ニューシングル発売", date: "2026-07-22", note: "" },
  { id: 26, group: "Hey! Say! JUMP", type: "申込み期間", title: "HSJ FC先行", date: "2026-08-01", endDate: "2026-08-10", note: "" },
  { id: 27, group: "Hey! Say! JUMP", type: "当落日", title: "HSJ FC先行 当落", date: "2026-08-20", note: "" },
];

const GROUPS = ["すべて", "嵐", "SixTONES", "Snow Man", "なにわ男子", "King & Prince", "Travis Japan", "Hey! Say! JUMP"];

const TYPES = ["すべて", "ライブ", "申込み期間", "当落日", "CD・円盤", "舞台・その他"];

const TYPE_CONFIG = {
  "ライブ":     { color: "#FF6B9D", bg: "#FF6B9D22", icon: "🎤" },
  "申込み期間": { color: "#4ECDC4", bg: "#4ECDC422", icon: "📝" },
  "当落日":     { color: "#FFE66D", bg: "#FFE66D33", icon: "🎯" },
  "CD・円盤":   { color: "#A78BFA", bg: "#A78BFA22", icon: "💿" },
  "舞台・その他":{ color: "#FB923C", bg: "#FB923C22", icon: "🎭" },
};

const GROUP_COLORS = {
  "嵐": "#60A5FA",
  "SixTONES": "#F472B6",
  "Snow Man": "#34D399",
  "なにわ男子": "#FBBF24",
  "King & Prince": "#C084FC",
  "Travis Japan": "#FB7185",
  "Hey! Say! JUMP": "#38BDF8",
};

const MONTH_NAMES = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
const DAY_NAMES = ["日","月","火","水","木","金","土"];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function StartoCalendar() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedGroup, setSelectedGroup] = useState("すべて");
  const [selectedType, setSelectedType] = useState("すべて");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents = useMemo(() => {
    return EVENTS.filter(e => {
      if (selectedGroup !== "すべて" && e.group !== selectedGroup) return false;
      if (selectedType !== "すべて" && e.type !== selectedType) return false;
      return true;
    });
  }, [selectedGroup, selectedType]);

  const eventsInMonth = useMemo(() => {
    const map = {};
    filteredEvents.forEach(ev => {
      const start = new Date(ev.date);
      const end = ev.endDate ? new Date(ev.endDate) : start;
      const days = getDaysInMonth(currentYear, currentMonth);
      for (let d = 1; d <= days; d++) {
        const cellDate = new Date(currentYear, currentMonth, d);
        if (cellDate >= new Date(start.toDateString()) && cellDate <= new Date(end.toDateString())) {
          if (!map[d]) map[d] = [];
          map[d].push({ ...ev, isStart: cellDate.toDateString() === start.toDateString() });
        }
      }
    });
    return map;
  }, [filteredEvents, currentYear, currentMonth]);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  function prevMonth() {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  }
  function nextMonth() {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  }

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return filteredEvents
      .filter(e => new Date(e.date) >= now)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 8);
  }, [filteredEvents]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0c29, #1a1040, #24243e)",
      fontFamily: "'Hiragino Sans', 'Noto Sans JP', sans-serif",
      color: "#fff",
      padding: "0",
    }}>
      <div style={{
        background: "linear-gradient(90deg, #FF6B9D33, #A78BFA33)",
        borderBottom: "1px solid #ffffff15",
        padding: "20px 24px 16px",
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 22 }}>✨</span>
            <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800, letterSpacing: "0.05em", background: "linear-gradient(90deg, #FF6B9D, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              STARTO遠征カレンダー 2026
            </h1>
          </div>
          <p style={{ margin: 0, fontSize: 11, color: "#ffffff66", letterSpacing: "0.03em" }}>
            ツアー日程・申込み・当落・リリース情報をまとめてチェック
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "20px 16px" }}>
        <div style={{
          background: "#ffffff08",
          borderRadius: 16,
          padding: "16px",
          marginBottom: 20,
          border: "1px solid #ffffff10",
        }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: "#ffffff55", letterSpacing: "0.1em", marginBottom: 8, textTransform: "uppercase" }}>GROUP</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {GROUPS.map(g => {
                const active = selectedGroup === g;
                const color = g === "すべて" ? "#ffffff" : GROUP_COLORS[g] || "#fff";
                return (
                  <button key={g} onClick={() => setSelectedGroup(g)} style={{
                    padding: "5px 12px",
                    borderRadius: 20,
                    border: `1.5px solid ${active ? color : "#ffffff20"}`,
                    background: active ? `${color}22` : "transparent",
                    color: active ? color : "#ffffff66",
                    fontSize: 12,
                    fontWeight: active ? 700 : 400,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}>{g}</button>
                );
              })}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: "#ffffff55", letterSpacing: "0.1em", marginBottom: 8, textTransform: "uppercase" }}>TYPE</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {TYPES.map(t => {
                const active = selectedType === t;
                const cfg = TYPE_CONFIG[t] || { color: "#fff", icon: "📌" };
                return (
                  <button key={t} onClick={() => setSelectedType(t)} style={{
                    padding: "5px 12px",
                    borderRadius: 20,
                    border: `1.5px solid ${active ? cfg.color : "#ffffff20"}`,
                    background: active ? cfg.bg : "transparent",
                    color: active ? cfg.color : "#ffffff66",
                    fontSize: 12,
                    fontWeight: active ? 700 : 400,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}>{t === "すべて" ? "すべて" : `${cfg.icon} ${t}`}</button>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 20, alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <button onClick={prevMonth} style={{ background: "#ffffff10", border: "none", color: "#fff", width: 36, height: 36, borderRadius: 10, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "0.05em" }}>{currentYear}年</div>
                <div style={{ fontSize: 28, fontWeight: 900, background: "linear-gradient(90deg, #FF6B9D, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>{MONTH_NAMES[currentMonth]}</div>
              </div>
              <button onClick={nextMonth} style={{ background: "#ffffff10", border: "none", color: "#fff", width: 36, height: 36, borderRadius: 10, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3, marginBottom: 3 }}>
              {DAY_NAMES.map((d, i) => (
                <div key={d} style={{
                  textAlign: "center", fontSize: 11, fontWeight: 700,
                  color: i === 0 ? "#FF6B9D" : i === 6 ? "#60A5FA" : "#ffffff55",
                  padding: "6px 0",
                  letterSpacing: "0.05em",
                }}>{d}</div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3 }}>
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} style={{ minHeight: 80 }} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dayEvents = eventsInMonth[day] || [];
                const dateObj = new Date(currentYear, currentMonth, day);
                const isToday = dateObj.toDateString() === today.toDateString();
                const dayOfWeek = dateObj.getDay();
                const isSun = dayOfWeek === 0;
                const isSat = dayOfWeek === 6;
                const hasAlert = dayEvents.some(e => e.type === "当落日");

                return (
                  <div key={day} style={{
                    minHeight: 80,
                    background: isToday ? "#FF6B9D15" : hasAlert ? "#FFE66D08" : "#ffffff05",
                    borderRadius: 10,
                    border: isToday ? "1.5px solid #FF6B9D55" : hasAlert ? "1.5px solid #FFE66D33" : "1px solid #ffffff08",
                    padding: "6px 4px",
                    overflow: "hidden",
                  }}>
                    <div style={{
                      fontSize: 12,
                      fontWeight: isToday ? 800 : 500,
                      color: isToday ? "#FF6B9D" : isSun ? "#FF6B9Daa" : isSat ? "#60A5FAaa" : "#ffffffaa",
                      marginBottom: 4,
                      lineHeight: 1,
                    }}>{day}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      {dayEvents.slice(0, 3).map((ev, idx) => {
                        const cfg = TYPE_CONFIG[ev.type] || { color: "#fff", bg: "#ffffff10" };
                        const gc = GROUP_COLORS[ev.group] || "#fff";
                        return (
                          <div key={idx}
                            onClick={() => setSelectedEvent(ev)}
                            style={{
                              fontSize: 9,
                              background: ev.isStart ? cfg.bg : "#ffffff05",
                              borderLeft: `2px solid ${ev.isStart ? gc : gc + "44"}`,
                              borderRadius: "0 3px 3px 0",
                              padding: "2px 3px",
                              cursor: "pointer",
                              color: ev.isStart ? "#ffffffcc" : "#ffffff44",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                            title={ev.title}
                          >
                            {ev.isStart ? `${cfg.icon} ${ev.title}` : "　↕"}
                          </div>
                        );
                      })}
                      {dayEvents.length > 3 && (
                        <div style={{ fontSize: 9, color: "#ffffff44", paddingLeft: 3 }}>+{dayEvents.length - 3}件</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ position: "sticky", top: 90 }}>
            <div style={{
              background: "#ffffff08",
              borderRadius: 16,
              border: "1px solid #ffffff10",
              overflow: "hidden",
            }}>
              <div style={{
                padding: "14px 16px 10px",
                borderBottom: "1px solid #ffffff10",
                background: "linear-gradient(90deg, #FF6B9D15, #A78BFA15)",
              }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#ffffff99", letterSpacing: "0.1em", textTransform: "uppercase" }}>UPCOMING</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>直近のイベント</div>
              </div>
              <div style={{ padding: "8px" }}>
                {upcomingEvents.length === 0 ? (
                  <div style={{ padding: "20px", textAlign: "center", color: "#ffffff33", fontSize: 12 }}>該当なし</div>
                ) : upcomingEvents.map(ev => {
                  const cfg = TYPE_CONFIG[ev.type] || { color: "#fff", icon: "📌" };
                  const gc = GROUP_COLORS[ev.group] || "#fff";
                  const daysLeft = Math.ceil((new Date(ev.date) - today) / (1000 * 60 * 60 * 24));
                  return (
                    <div key={ev.id}
                      onClick={() => setSelectedEvent(ev)}
                      style={{
                        padding: "10px 10px",
                        borderRadius: 10,
                        marginBottom: 4,
                        cursor: "pointer",
                        background: "#ffffff05",
                        border: "1px solid #ffffff08",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "#ffffff10"}
                      onMouseLeave={e => e.currentTarget.style.background = "#ffffff05"}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 3 }}>
                        <div style={{ fontSize: 9, padding: "2px 6px", borderRadius: 10, background: cfg.bg, color: cfg.color, fontWeight: 700 }}>
                          {cfg.icon} {ev.type}
                        </div>
                        <div style={{ fontSize: 9, color: daysLeft <= 7 ? "#FFE66D" : "#ffffff44" }}>
                          {daysLeft === 0 ? "今日" : `あと${daysLeft}日`}
                        </div>
                      </div>
                      <div style={{ fontSize: 9, color: gc, fontWeight: 700, marginBottom: 2 }}>{ev.group}</div>
                      <div style={{ fontSize: 11, color: "#ffffffcc", lineHeight: 1.3 }}>{ev.title}</div>
                      <div style={{ fontSize: 9, color: "#ffffff44", marginTop: 3 }}>
                        {ev.date}{ev.endDate ? ` 〜 ${ev.endDate}` : ""}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{
              background: "#ffffff08",
              borderRadius: 16,
              border: "1px solid #ffffff10",
              padding: "14px 16px",
              marginTop: 12,
            }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: "#ffffff55", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>LEGEND</div>
              {Object.entries(TYPE_CONFIG).map(([type, cfg]) => (
                <div key={type} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: cfg.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: "#ffffffaa" }}>{cfg.icon} {type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedEvent && (
        <div
          onClick={() => setSelectedEvent(null)}
          style={{
            position: "fixed", inset: 0,
            background: "#00000088",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 100,
            padding: 20,
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "linear-gradient(135deg, #1a1040, #24243e)",
              borderRadius: 20,
              border: "1px solid #ffffff15",
              padding: 24,
              maxWidth: 400,
              width: "100%",
            }}
          >
            {(() => {
              const cfg = TYPE_CONFIG[selectedEvent.type] || { color: "#fff", icon: "📌", bg: "#ffffff10" };
              const gc = GROUP_COLORS[selectedEvent.group] || "#fff";
              return (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: cfg.bg, color: cfg.color, fontWeight: 700 }}>
                      {cfg.icon} {selectedEvent.type}
                    </div>
                    <button onClick={() => setSelectedEvent(null)} style={{ background: "#ffffff10", border: "none", color: "#fff", width: 28, height: 28, borderRadius: 8, cursor: "pointer", fontSize: 14 }}>✕</button>
                  </div>
                  <div style={{ fontSize: 12, color: gc, fontWeight: 800, marginBottom: 6, letterSpacing: "0.05em" }}>{selectedEvent.group}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", lineHeight: 1.3, marginBottom: 12 }}>{selectedEvent.title}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: "#ffffff44", minWidth: 40 }}>日程</span>
                      <span style={{ fontSize: 13, color: "#ffffffcc" }}>
                        {selectedEvent.date}{selectedEvent.endDate ? ` 〜 ${selectedEvent.endDate}` : ""}
                      </span>
                    </div>
                    {selectedEvent.note && (
                      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ fontSize: 11, color: "#ffffff44", minWidth: 40 }}>メモ</span>
                        <span style={{ fontSize: 12, color: "#ffffffaa", lineHeight: 1.5 }}>{selectedEvent.note}</span>
                      </div>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
