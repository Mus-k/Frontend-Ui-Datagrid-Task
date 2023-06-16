import { motion } from "framer-motion";
// arama kismi formu
function GlobalFilter({ filter, setFilter }) {
    return (
      <div className="seacrDiv">
        {" "}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 }
          }}
         className="search">
          <input
            type="search"
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search objects..."
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </motion.div>
        <div className="filter">
          <i className="fa-solid fa-filter"></i>
        </div>
      </div>
    );
  }

  export default GlobalFilter;