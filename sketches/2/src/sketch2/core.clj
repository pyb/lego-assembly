(ns sketch2.core
  (:gen-class))

(def brick-list
  '(;x y z dir c
     [0 0 0 1 1]
     [3 0 0 0 2]
     [0 1.5 0 0]
    ))

(def xscale 20)
(def yscale 24)
(def zscale 20)

(defn str-brick [[x y z dir c]]
  (let [color c
        X (* x xscale)
        Y (* y yscale)
        Z (* z zscale)
        matrix (if (= dir 0)
                 "1 0  0 0 1 0 0 0 1" ; no rotation
                 "0 0 -1 0 1 0 1 0 0") ; pi/2 rotation around Y axis
       ]
    (str "1 " color " "
         X " " Y " " Z " "
         matrix " "
         "3004.DAT")))

;;1 14 -23 -58 -17 0 0 -1 0.866025 0.5 0 0.5 -0.866025 0 977.DAT
;;1 16 1 -35 0 1 0 0 0 0.642788 0.766045 0 -0.766045 0.642788 976.DAT
t
(defn create-file [fname strings]
  (spit fname
        (clojure.string/join "\n" strings)))

(defn -main
  [& args]
  (println "Lego.")
  (create-file "/home/pyb/foobar.dat"
               (map str-brick
                    brick-list)))

;;; list of [number type] with part 0 the origin
(def parts [[0 :2x1] [1 :2x1] [2 :2x1]])

;;; [part1 part2 mate1 mate2 parameter]
;;; parameter is an angle here.

(def links '([0 1 [:stud 1] [:antistud 0] 0]
             [1 2 [:stud 1] [:antistud 0] 0]))

;;;            [1 2 [:stud 1] [:antistud 0] 1/2])) ; try angle later

;; return a new element of assembly, ie {part [x y z]}
(defn convert-link [link parts assembly]
  (println link)
  (println parts)
  (println assembly)
  (if (or (not link) (empty? parts))
    assembly
    (let [
          [partnA partnB [_ nstud] [_ nantistud] angle] link
          partA (nth parts partnA)
          partB (nth parts partnB)
          ]
      (let [rpos-stud (nth (:studs brick2x1)
                            nstud)
            rpos-antistud (nth (:antistuds brick2x1)
                                nantistud)
            posA (assembly partA)
            posB (map + ;; TODO : rotation 
                      posA
                      [0 1 0]
                      rpos-stud
                      (map - rpos-antistud))]
        (assoc assembly partB posB)))))

(defn convert-parts
  ([parts links]
   (convert-parts parts links []))
  ([parts links assembly]
   (cond (empty? links)
         [parts links assembly]
         (empty? parts)
         [parts links assembly]
         (empty? assembly)
         (convert-parts parts links {(first parts) [0 0 0]})
         :else
         (convert-parts parts
                        (rest links)
                        (convert-link (first links)
                                      parts assembly)))))

(def brick2x1 {
               :studs [[0 0 0]
                       [1 0 0]]
               :antistuds [[0 0 0]
                           [1 0 0]]
               })

;; rpos = relative position


(defn part-brick [part [x y z]]
  (let [color 7
        dir 0
        X (* x xscale)
        Y (* y yscale)
        Z (* z zscale)
        matrix (if (= dir 0)
                 "1 0  0 0 1 0 0 0 1" ; no rotation
                 "0 0 -1 0 1 0 1 0 0") ; pi/2 rotation around Y axis
       ]
    (str "1 " color " "
         X " " Y " " Z " "
         matrix " "
         "3004.DAT")))

(defn assembly-to-file [assy filename]
  (create-file filename
               (map (partial apply part-brick)
                    assy)))

;; TODO : rotations
